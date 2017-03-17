	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onDisableMove: function (pokemon) {
			if (pokemon.lastMove !== 'struggle') pokemon.disableMove(pokemon.lastMove);
		},
	},
