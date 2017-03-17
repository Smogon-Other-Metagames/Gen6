	{
		ruleset: ['OU'],
		banlist: ['Imposter', 'Transform'],
		onValidateSet: function(set) {
			if (set.moves.length > 2) return [(set.name || set.species) + ' has more than two moves.'];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.mirrorMoveset = pokemon.baseMoveset.map(move => Object.assign({}, move));
			}
			for (let entry of pokemon.moveset) {
				entry.disabled = false;
				entry.disabledSource = '';
			}
		},
		onDisableMovePriority: 1,
		onDisableMove: function (pokemon) {
			pokemon.moveset = pokemon.baseMoveset.concat(pokemon.side.foe.active[0].mirrorMoveset);
		},
	},
