	{
		ruleset: ['OU'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			['acidarmor', 'agility', 'amnesia', 'autotomize', 'barrier', 'bulkup', 'calmmind', 'cosmicpower', 'defendorder', 'dragondance', 'focusenergy', 'growth', 'honeclaws', 'irondefense', 'nastyplot', 'rockpolish', 'swordsdance', 'workup'].forEach(move => template.learnset[move] = ['6T']);
			return this.validateSet(set, teamHas, template);
		},
	},
