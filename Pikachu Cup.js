	{
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Arceus', 'Raikou', 'Thundurus', 'Thundurus-Therian', 'Zapdos', 'Zekrom'],
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species);
			if (!template.types || !template.types.includes('Electric')) return [template.species + " is not allowed because it does not have Electric type."];
		},
	},
