	{
		ruleset: ['OU'],
		banlist: ['Dragonite', 'Kyurem-Black'],
		onModifyMovePriority: -2,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = pokemon.set.shiny && pokemon.types[1] || pokemon.types[0];
				if (move.category !== 'Status') pokemon.addVolatile('pixilate');
			}
		},
	},
