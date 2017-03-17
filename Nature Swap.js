	{
		ruleset: ['OU'],
		banlist: ['Chansey', 'Cloyster'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let nature = this.battle.getNature(target.set.nature);
			let baseStats = Object.assign({}, template.baseStats);
			baseStats[nature.plus] = template.baseStats[nature.minus];
			baseStats[nature.minus] = template.baseStats[nature.plus];
			return Object.assign({}, template, {baseStats: baseStats});
		},
		formeChange: function (template, dontRecalculateStats) {
			if (!dontRecalculateStats) {
				let nature = this.battle.getNature(this.set.nature);
				template = Object.assign({}, this.battle.getTemplate(template));
				template.baseStats = Object.assign({}, template.baseStats);
				let plus = template.baseStats[nature.plus];
				let minus = template.baseStats[nature.minus];
				template.baseStats[nature.plus] = minus;
				template.baseStats[nature.minus] = plus;
			}
			return this._formeChange.call(this, template, dontRecalculateStats);
		},
	},
