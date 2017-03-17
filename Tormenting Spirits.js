	{
		ruleset: ['OU'],
		banlist: ['Encore', 'Switcheroo + Choice Band', 'Switcheroo + Choice Scarf', 'Switcheroo + Choice Specs', 'Trick + Choice Band', 'Trick + Choice Scarf', 'Trick + Choice Specs'],
		onDisableMove: function (pokemon) {
			if (pokemon.lastMove !== 'struggle') pokemon.disableMove(pokemon.lastMove);
		},
	},
