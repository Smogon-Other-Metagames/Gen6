	{
		maxLevel: 50,
		ruleset: ['OU'],
		banlist: ['Chansey', 'Combusken', 'Kadabra', 'Magneton', 'Eviolite', 'Light Ball', 'Contrary', 'Protean'],
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species);
			if (!template.prevo) return [set.species + " is not an evolved Pokemon."];
			if (!template.nfe) return [set.species + " does not have an evolution."];
		},
	},
