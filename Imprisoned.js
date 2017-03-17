	{
		ruleset: ['OU'],
		onBegin: function () {
			this.p1.usedMoves = new Set();
			this.p2.usedMoves = new Set();
		},
		onDisableMove: function (pokemon) {
			pokemon.side.foe.usedMoves.forEach(move => pokemon.disableMove(move));
		},
		onBeforeMovePriority: 8,
		onBeforeMove: function (source, target, move) {
			if (move.id === 'struggle') return;
			if (source.side.foe.usedMoves.has(move.id)) {
				this.add('cant', source, 'Disable', move);
				return false;
			}
			source.side.usedMoves.add(move.id);
		},
	},
