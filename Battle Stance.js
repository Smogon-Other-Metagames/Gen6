	{
		ruleset: ['OU'],
		onBeforeMovePriority: 11,
		onBeforeMove: function (attacker, defender, move) {
			if (move.category === 'Status' && !move.stallingMove) return;
			if (attacker.template.stallingMove !== move.stallingMove) return;
			let template = Object.assign({}, attacker.template);
			delete template.stallingMove;
			if (!move.stallingMove) template.stallingMove = true;
			template.baseStats = {
				hp: attacker.template.baseStats.hp,
				atk: attacker.template.baseStats.def,
				def: attacker.template.baseStats.atk,
				spa: attacker.template.baseStats.spd,
				spd: attacker.template.baseStats.spa,
				spe: attacker.template.baseStats.spe,
			};
			attacker.formeChange(template);
		},
	},
