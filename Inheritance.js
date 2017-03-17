	{
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 'Evasion Moves Clause', 'OKHO Clause', 'Swagger Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal', 'Assist', 'Chatter'],
		customBans: {
			receiver: {
				arceus:1, archeops:1, darkrai:1, deoxys:1, deoxysattack:1, deoxysspeed:1, dialga:1, giratina:1, giratinaorigin:1,
				groudon:1, hooh:1, hoopaunbound:1, keldeo:1, kyogre:1, kyuremblack:1, kyuremwhite:1, lugia:1, mewtwo:1, palkia:1,
				rayquaza:1, regigigas:1, reshiram:1, shayminsky:1, shedinja:1, slaking:1, xerneas:1, yveltal:1, zekrom:1
			},
			donor: {masquerain:1, sableye:1, smeargle:1},
			inheritedAbilities: {arenatrap:1, galewings:1, hugepower:1, imposter:1, parentalbond:1, purepower:1, shadowtag:1, wonderguard:1},
			items: {blazikenite:1, gengarite:1, kangaskhanite:1, mawilite:1, salamencite:1, souldew:1}
		},
		noChangeForme: true,
		noChangeAbility: true,
		getEvoFamily: function (species) {
			let template = Tools.getTemplate(species);
			while (template.prevo) {
				template = Tools.getTemplate(template.prevo);
			}
			return template.speciesid;
		},
		onValidateTeam: function (team, format, teamHas) {
			// Donor Clause
			let evoFamilyLists = [];
			for (let i = 0; i < team.length; i++) {
				let set = team[i];
				if (!set.abilitySources) continue;
				evoFamilyLists.push(new Set(set.abilitySources.map(format.getEvoFamily)));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			let requiredFamilies = Object.create(null);
			for (let i = 0; i < evoFamilyLists.length; i++) {
				let evoFamilies = evoFamilyLists[i];
				if (evoFamilies.size !== 1) continue;
				evoFamilies = Array.from(evoFamilies);
				if (requiredFamilies[evoFamilies[0]]) return ["You are limited to one inheritance from each family by the Donor Clause.", "(You inherit more than once from " + this.getTemplate(evoFamilies[0]).species + "'s.)"];
				requiredFamilies[evoFamilies[0]] = 1;
			}
		},
		validateSet: function (set, teamHas) {
			if (!this.format.abilityMap) {
				let abilityMap = Object.create(null);
				for (let speciesid in this.tools.data.Pokedex) {
					let pokemon = this.tools.data.Pokedex[speciesid];
					if (pokemon.num < 1 || pokemon.num > 720) continue;
					for (let key in pokemon.abilities) {
						let abilityId = toId(pokemon.abilities[key]);
						if (abilityMap[abilityId]) {
							abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](speciesid);
						} else {
							abilityMap[abilityId] = [speciesid];
						}
					}
				}
				this.format.abilityMap = abilityMap;
			}

			this.format.noChangeForme = false;
			let problems = this.tools.getFormat('Pokemon').onChangeSet.call(this.tools, set, this.format) || [];
			this.format.noChangeForme = true;

			if (problems.length) return problems;

			let species = toId(set.species);
			let template = this.tools.getTemplate(species);
			if (!template.exists) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.isUnreleased) return ["" + set.species + " is unreleased."];
			if (template.speciesid in this.format.customBans.receiver) {
				return ["" + set.species + " is banned."];
			} else if (!this.tools.data.FormatsData[species] || !this.tools.data.FormatsData[species].tier) {
				if (toId(template.baseSpecies) in this.format.customBans.receiver) {
					return ["" + template.baseSpecies + " is banned."];
				}
			}

			let name = set.name;

			let abilityId = toId(set.ability);
			if (!abilityId) return ["" + (set.name || set.species) + " must have an ability."];
			let pokemonWithAbility = this.format.abilityMap[abilityId];
			if (!pokemonWithAbility) return ["" + set.ability + " is an invalid ability."];
			let isBaseAbility = Object.values(template.abilities).map(toId).indexOf(abilityId) >= 0;
			if (!isBaseAbility && abilityId in this.format.customBans.inheritedAbilities) return ["" + set.ability + " is banned from being passed down."];

			// Items must be fully validated here since we may pass a different item to the base set validator.
			let item = this.tools.getItem(set.item);
			if (item.id) {
				if (!item.exists) return ["" + set.item + " is an invalid item."];
				if (item.isUnreleased) return ["" + (set.name || set.species) + "'s item " + item.name + " is unreleased."];
				if (item.id in this.format.customBans.items) return ["" + item.name + " is banned."];
			}

			let validSources = set.abilitySources = []; // evolutionary families
			for (let i = 0; i < pokemonWithAbility.length; i++) {
				let donorTemplate = this.tools.getTemplate(pokemonWithAbility[i]);
				let evoFamily = this.format.getEvoFamily(donorTemplate);

				if (validSources.indexOf(evoFamily) >= 0) {
					// The existence of a legal set has already been established.
					// We only keep iterating to find all legal donor families (Donor Clause).
					// Skip this redundant iteration.
					continue;
				}

				if (set.name === set.species) delete set.name;
				if (donorTemplate.species !== set.species && toId(donorTemplate.species) in this.format.customBans.donor) {
					problems = ["" + donorTemplate.species + " is banned from passing abilities down."];
					continue;
				} else if (donorTemplate.species !== set.species && abilityId in this.format.customBans.inheritedAbilities) {
					problems = ["The ability " + this.tools.getAbility(abilityId).name + " is banned from being passed down."];
					continue;
				}
				set.species = donorTemplate.species;
				if (donorTemplate.species !== template.species && donorTemplate.requiredItem) {
					// Bypass forme validation. Relevant to inherit from Giratina-O, and Mega/Primal formes.
					set.item = donorTemplate.requiredItem;
				}
				problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					validSources.push(evoFamily);
				}
				if (validSources.length > 1) {
					// This is an optimization only valid for the current basic implementation of Donor Clause.
					// Remove if the FIXME? above actually gets fixed.
					break;
				}
			}

			// Restore the intended species, name and item.
			set.species = template.species;
			set.name = (name === set.species ? "" : name);
			set.item = item.name;

			if (!validSources.length && pokemonWithAbility.length > 1) {
				return ["" + (set.name || set.species) + " set is illegal."];
			}
			if (!validSources.length) {
				problems.unshift("" + (set.name || set.species) + " has an illegal set with an ability from " + this.tools.getTemplate(pokemonWithAbility[0]).name);
				return problems;
			}
		},
	},
