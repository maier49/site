import { REGION_GROUP_MATCHER } from '../parser';
import { INLINE_HASH_MATCHER } from './inline-hash';

const regionName = 'RegionName';
const regionName2 = 'RegionName2';

const regionContents = `	some:
		setting:
			# This is for setting a message
			property: 'Hey there!'
			otherProperty: true`;

const region = `	# @start-region RegionName
${regionContents}
	# @end-region RegionName`;

describe('inline-hash region-matcher', () => {
	it('should match start annotations', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const startMatcher = new RegExp(regionMatcher.regionStartMatcher);

		matches = startMatcher.exec(`# @start-region ${regionName}`);
		expect(matches).not.toBeNull();

		matches = startMatcher.exec(`#@start-region ${regionName}`);
		expect(matches).not.toBeNull();

		matches = startMatcher.exec(`# @start-region ${regionName2}`);
		expect(matches).toBeNull();
	});

	it('should match end annotations', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const endMatcher = new RegExp(regionMatcher.regionEndMatcher);

		matches = endMatcher.exec(`# @end-region ${regionName} `);
		expect(matches).not.toBeNull();

		matches = endMatcher.exec(`#@end-region ${regionName}`);
		expect(matches).not.toBeNull();

		matches = endMatcher.exec(`# @end-region ${regionName2}`);
		expect(matches).toBeNull();
	});

	it('should match all region comments', () => {
		let matches: RegExpMatchArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.regionCommentMatcher;

		matches = `# @end-region ${regionName} `.match(regionMatcher);
		expect(matches).not.toBeNull();

		matches = `#@end-region ${regionName2}`.match(regionMatcher);
		expect(matches).not.toBeNull();

		matches = `# @start-region ${regionName} `.match(regionMatcher);
		expect(matches).not.toBeNull();

		matches = `#@start-region ${regionName2}`.match(regionMatcher);
		expect(matches).not.toBeNull();

		matches = `# @middle-region ${regionName} `.match(regionMatcher);
		expect(matches).toBeNull();
	});

	it('should match full region and retreive contents', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const regionRegExp = new RegExp(
			`${regionMatcher.regionStartMatcher}${REGION_GROUP_MATCHER}${regionMatcher.regionEndMatcher}`,
			'gm'
		);

		matches = regionRegExp.exec(region);
		expect(matches).not.toBeNull();

		if (matches) {
			expect(matches).toHaveLength(2);
			expect(matches[1]).toBe(regionContents);
		}
	});
});
