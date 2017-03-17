	{
		ruleset: ['OU'],
		banlist: ['Kyurem-Black'],
		onModifyMove: function(move, pokemon) {
			var index = pokemon.moves.indexOf(move.id);
			move.type = pokemon.getTypes()[index] || move.type;
		}
	},
