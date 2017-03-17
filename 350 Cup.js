	{
		ruleset: ['Ubers'],
		banlist: [
			'Abra', 'Cranidos', 'Darumaka', 'Gastly', 'Pawniard', 'Smeargle', 'Spritzee',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Thick Club',
		],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;

			if (!template.abilities) return false;

			if (Object.values(template.baseStats).reduce((x, y) => x + y) > 350) return;

			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			for (let statName in template.baseStats) {
				template.baseStats[statName] *= 2;
			}
			return template;
		},
	},
