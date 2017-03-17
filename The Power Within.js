	{
		ruleset: ['OU'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			let hpType = 'Dark';
			if (set.ivs) {
				let hpTypeX = 0;
				['hp', 'atk', 'def', 'spe', 'spa', 'spd'].forEach((stat, i) => hpTypeX += (set.ivs[stat] || set.ivs[stat] === 0 ? set.ivs[stat] & 1 : 1) << i);
				hpType = ['Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'][Math.floor(hpTypeX * 15 / 63)];
			}
			for (let id in this.tools.data.Movedex) {
				let move = this.tools.getMove(id);
				if (move.type === hpType) template.learnset[id] = ['6T'];
			}
			return this.validateSet(set, teamHas, template);
		},
	},
