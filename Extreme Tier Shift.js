	{
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Eviolite'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			if (target.set.ability in {'Drizzle': 1, 'Drought': 1, 'Shadow Tag': 1}) return;

			if (!template.abilities) return false;

			let boosts = {
				'UU': 10,
				'BL2': 10,
				'RU': 20,
				'BL3': 20,
				'NU': 30,
				'BL4': 30,
				'PU': 40,
				'NFE': 40,
				'LC Uber': 40,
				'LC': 40,
			};
			let tier = template.tier;
			if (target.set.item) {
				let item = this.getItem(target.set.item);
				if (item.megaEvolves === template.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (tier[0] === '(') tier = tier.slice(1, -1);
			if (!(tier in boosts)) return;

			let boost = target.set.moves.includes('chatter') ? 30 : boosts[tier];
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			for (let statName in template.baseStats) {
				template.baseStats[statName] += boost;
			}
			return template;
		},
	},
