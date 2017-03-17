	{
		ruleset: ['OU'],
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			let move = this.getMove(pokemon.name);
			if (move.target === "all" || move.target === "allySide") this.useMove(move, pokemon);
		}
	},
