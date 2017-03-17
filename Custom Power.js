	{
		ruleset: ['OU'],
		onModifyMove: function(move, pokemon) {
			if (move.id === pokemon.moves[0]) {
				move.type = pokemon.hpType || 'Dark';
			}
		}
	},
