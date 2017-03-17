	{
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Soul Dew', 'Blue Orb + Red Orb > 1'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			if (template.tier !== 'Uber') return;
			let baseStats = {};
			for (let stat in template.baseStats) {
				baseStats[stat] = Math.floor(template.baseStats[stat] / 2 + 40);
			}
			return Object.assign({}, template, {baseStats: baseStats});
		},
	},
