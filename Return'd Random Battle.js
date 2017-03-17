	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onModifyMovePriority: 2,
		onModifyMove: function (move, pokemon) {
			if (move.basePower > 0 && !move.multihit && move.id === pokemon.moves[0]) {
				move.basePower = Math.floor(pokemon.happiness * 2 / 5) || 1;
			}
		},
	},
