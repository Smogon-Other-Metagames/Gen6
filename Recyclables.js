	{
		ruleset: ['OU'],
		banlist: ['Shedinja'],
		onResidualOrder: 999,
		onResidual: function () {
			[this.p1.pokemon[0], this.p2.pokemon[0]].forEach(pokemon => {
				if (pokemon.lastItem && !pokemon.item && !pokemon.fainted) {
					pokemon.setItem(pokemon.lastItem);
					this.add('-item', pokemon, pokemon.getItem(), '[from] move: Recycle');
				}
			});
		},
	},
