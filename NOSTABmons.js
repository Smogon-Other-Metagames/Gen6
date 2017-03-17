	{
		ruleset: ['OU'],
		overridelist: ['Lucario-Mega', 'Shaymin-Sky'],
		onDisableMove: function (pokemon) {
			for (let i = 0; i < pokemon.moves.length; i++) {
				let move = pokemon.moves[i];
				let type = this.getMove(move).type;
				if (type === 'Normal') {
					if (pokemon.ability === 'Aerilate') type = 'Flying';
					if (pokemon.ability === 'Pixilate') type = 'Fairy';
					if (pokemon.ability === 'Refrigerate') type = 'Ice';
				}
				if (pokemon.types.includes(type)) pokemon.disableMove(move);
			}
		},
	},
