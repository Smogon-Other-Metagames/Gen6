	{
		ruleset: ['OU'],
		banlist: ['Swoobat'],
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let species = team[i].species;
				if (nameTable[species[0]]) return ["You are limited to one Pokemon per letter."];
				nameTable[species[0]] = true;
			}
		},
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			for (let id in this.tools.data.Movedex) {
				if (id !== 'sketch' && id[0] === template.id[0]) template.learnset[id] = '6T';
			}
			return this.validateSet(set, teamHas, template);
		},
	},
