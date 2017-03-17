	{
		ruleset: ['OU'],
		onFaint: function (pokemon, source, effect) {
			if (source && effect && effect.effectType === 'Move' && !effect.isFutureMove) {
				if (source.setAbility(pokemon.ability)) {
					this.add('-ability', source, this.getAbility(source.ability).name, '[from] move: Role Play', '[of] ' + pokemon);
				}
				if (pokemon.lastMove && !source.baseMoveset.some(move => move.id === pokemon.lastMove)) {
					let move = Tools.getMove(pokemon.lastMove);
					let metaMove = {
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.maxpp,
						target: move.target,
						disabled: false,
						used: false,
					}
					source.baseMoveset.push(metaMove);
					if (!source.transformed) {
						source.moveset.push(metaMove);
						source.moves.push(toId(move.name));
					}
					this.add('-activate', source, 'move: Sketch', move.name);
				}
			}
		},
	},
