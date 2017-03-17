	{
		ruleset: ['OU'],
		banlist: ['Archeops', 'Regigigas', 'Slaking'],
		validateSet: function (set, teamHas) {
			let bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Flower Gift': 1, 'Forecast': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, /*'Prankster': 1, */'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Stance Change': 1, 'Wonder Guard': 1, 'Zen Mode': 1};
			let ability = this.tools.getAbility(set.ability);
			if (bannedAbilities[ability.name] || !this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			template.abilities = {0: ability.name};
			return this.validateSet(set, teamHas, template);
		},
		onValidateTeam: function (team) {
			let problems = [];
			let pokedex = Object.keys(this.data.Pokedex);
			let usedPokemon = [];
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				let ability = team[i].ability;
				if (!ability) {
					problems.push(template.species + " needs to have an ability.");
					continue;
				}
				let sources = pokedex.filter(pokemon => usedPokemon.indexOf(pokemon) < 0 && Tools.data.Pokedex[pokemon].num > 0 && template.types.slice().sort().toString() === Tools.data.Pokedex[pokemon].types.slice().sort().toString() && Object.values(Tools.data.Pokedex[pokemon].abilities).indexOf(ability) >= 0);
				if (!sources.length) {
					problems.push(template.species + " cannot obtain the ability " + ability + ".");
					continue;
				}
				if (ability in {'Aerilate': 1, 'Arena Trap': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Pure Power': 1, 'Simple':1, 'Speed Boost': 1}) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (ability === template.abilities[i]) legalAbility = true;
					}
					if (!legalAbility) {
						problems.push("The ability " + ability + " is banned on Pok\u00e9mon that do not naturally have it.");
						continue;
					}
				}
				usedPokemon.push(sources[0]);
			}
			return problems;
		},
	},
