import { getActiveSurreal } from "~/surreal";
import { TableDefinition } from "~/typings";
import { SurrealistAdapter } from "./base";

/**
 * Surrealist adapter for running as web app
 */
export class BrowserAdapter implements SurrealistAdapter {
	
	public isServeSupported = false;
	public isPinningSupported = false;
	public isOpenURLSupported = false;
	public isUpdateCheckSupported = false;
	public isPromotionSupported = true;

	public async setWindowTitle(title: string) {
		document.title = title;
	}

	public async loadConfig() {
		return localStorage.getItem('surrealist:config') || '{}';
	}

	public async saveConfig(config: string) {
		localStorage.setItem('surrealist:config', config);
	}

	public async startDatabase() {
		throw new Error('Not supported');
	}

	public async stopDatabase() {
		throw new Error('Not supported');
	}

	public async togglePinned() {
		throw new Error('Not supported');
	}

	public async openUrl() {
		throw new Error('Not supported');
	}

	public async fetchSchema(): Promise<TableDefinition[]> {
		const surreal = getActiveSurreal();
		const dbResponse = await surreal.query('INFO FOR DB');
		const dbResult = dbResponse[0].result;

		if (!dbResult) {
			return [];
		}

		return Object.keys(dbResult.tb).map(name => ({
			schema: {
				name: name,
				view: null,
				drop: false,
				schemafull: false,
				permissions: {
					create: '',
					select: '',
					update: '',
					delete: ''
				}
			},
			fields: [],
			indexes: [],
			events: []
		}));
	}

	public async validateQuery() {
		return null;
	}

	public async validateWhereClause() {
		return true;
	}

}