	{
		ruleset: ['OU'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let types = [...new Set(pokemon.moves.slice(0, 2).map(move => this.getMove(move).type))];
			return Object.assign({}, template, {types: types});
		},
	},
