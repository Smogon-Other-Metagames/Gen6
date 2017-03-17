	{
		ruleset: ['OU'],
		banlist: ['Damp Rock'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			if (target.set.ability in {'Drizzle': 1, 'Drought': 1, 'Shadow Tag': 1}) return;

			if (!template.abilities) return false;

			let boosts = {
				'UU': 5,
				'BL2': 5,
				'RU': 10,
				'BL3': 10,
				'NU': 15,
				'BL4': 15,
				'PU': 20,
				'NFE': 20,
				'LC Uber': 20,
				'LC': 20,
			};
			let tier = template.tier;
			if (target.set.item) {
				let item = this.getItem(target.set.item);
				if (item.megaEvolves === template.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (tier[0] === '(') tier = tier.slice(1, -1);
			if (!(tier in boosts)) return;

			let boost = target.set.moves.includes('chatter') ? 15 : boosts[tier];
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			for (let statName in template.baseStats) {
				template.baseStats[statName] += boost;
			}
			return template;
		},
	},
