import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import ThemedMixin, { theme } from '@dojo/framework/core/mixins/Themed';
import I18nMixin from '@dojo/framework/core/mixins/I18n';

import SideMenuItemList from './SideMenuItemList';
import * as css from './SideMenuSection.m.css';

export interface SideMenuSectionProperties {
	title?: string;
	fixed?: boolean;
}

@theme(css)
export default class SideMenuSection extends ThemedMixin(I18nMixin(WidgetBase))<SideMenuSectionProperties> {
	protected render() {
		const { title, fixed = false } = this.properties;

		return (
			<div key="menu-section" classes={this.theme([css.root, fixed ? css.fixed : undefined])}>
				{title && <h5 classes={this.theme(css.title)}>{title}</h5>}
				<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: this.theme([css.menuItems]) } }}>
					{this.children}
				</SideMenuItemList>
			</div>
		);
	}
}