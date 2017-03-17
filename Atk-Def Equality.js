	{
		ruleset: ['OU'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let baseStats = {};
			baseStats.hp = template.baseStats.hp;
			baseStats.def = baseStats.atk = template.baseStats.atk > template.baseStats.def ? template.baseStats.atk : template.baseStats.def;
			baseStats.spd = baseStats.spa = template.baseStats.spa > template.baseStats.spd ? template.baseStats.spa : template.baseStats.spd;
			baseStats.spe = template.baseStats.spe;
			return Object.assign({}, template, {baseStats: baseStats});
		},
	},
