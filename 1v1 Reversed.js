	{
		debug: true,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['1v1'],
		makeRequest: function (type, requestDetails) {
			if (type) {
				this.currentRequest = type;
				this.currentRequestDetails = requestDetails || '';
				this.rqid++;
				this.p1.clearChoice();
				this.p2.clearChoice();
			} else {
				type = this.currentRequest;
				requestDetails = this.currentRequestDetails;
			}

			// default to no request
			let p1request = null;
			let p2request = null;
			this.p1.currentRequest = '';
			this.p2.currentRequest = '';

			switch (type) {
			case 'teampreview':
				this.add('teampreview' + (requestDetails ? '|' + requestDetails : ''));
				this.p1.currentRequest = 'teampreview';
				p1request = {teamPreview: true, side: this.p1.getData(), rqid: this.rqid};
				this.p2.currentRequest = 'teampreview';
				p2request = {teamPreview: true, side: this.p2.getData(), rqid: this.rqid};
				break;

			default:
				this.p1.currentRequest = 'move';
				let activeData = this.p2.active.map(pokemon => pokemon && pokemon.getRequestData());
				p1request = {active: activeData, side: this.p1.getData(), rqid: this.rqid};

				this.p2.currentRequest = 'move';
				activeData = this.p1.active.map(pokemon => pokemon && pokemon.getRequestData());
				p2request = {active: activeData, side: this.p2.getData(), rqid: this.rqid};
				break;
			}

			if (this.p1 && this.p2) {
				let inactiveSide = -1;
				if (p1request && !p2request) {
					inactiveSide = 0;
				} else if (!p1request && p2request) {
					inactiveSide = 1;
				}
				if (inactiveSide !== this.inactiveSide) {
					this.send('inactiveside', inactiveSide);
					this.inactiveSide = inactiveSide;
				}
			}

			if (p1request) {
				if (!this.supportCancel || !p2request) p1request.noCancel = true;
				this.p1.emitRequest(p1request);
			} else {
				this.p1.decision = true;
				this.p1.emitRequest({wait: true, side: this.p1.getData()});
			}

			if (p2request) {
				if (!this.supportCancel || !p1request) p2request.noCancel = true;
				this.p2.emitRequest(p2request);
			} else {
				this.p2.decision = true;
				this.p2.emitRequest({wait: true, side: this.p2.getData()});
			}

			if (this.p1.getDecisionsFinished() && this.p2.getDecisionsFinished()) {
				if (this.p1.choiceData.decisions === true && this.p2.choiceData.decisions === true) {
					if (type !== 'move') {
						// TODO: investigate this race condition; should be fixed
						// properly later
						return this.makeRequest('move');
					}
					this.add('html', '<div class="broadcast-red"><b>The battle crashed</b></div>');
					this.win();
				} else {
					// some kind of weird race condition?
					this.commitDecisions();
				}
				return;
			}
		},
		undoChoice: function (sideid, count) {
			let side = null;
			if (sideid === 'p1' || sideid === 'p2') side = this[sideid];
			// The following condition can never occur for the reasons given in
			// the choose() function above.
			if (!side) return; // wtf
			// This condition can occur.
			if (!side.currentRequest) return;

			const targetSide = side.currentRequest === 'teampreview' ? side : side.foe;

			if (targetSide.choiceData.finalDecision) {
				this.debug("Can't cancel decision: the last pokemon could have been trapped or disabled");
				return;
			}

			const stepsBack = count === undefined || count === '' ? true : +count;
			if (stepsBack !== true && isNaN(stepsBack)) return;

			targetSide.undoChoices(stepsBack);
			targetSide.updateChoice();
		},
		choose: function (sideid, input, rqid) {
			let side = null;
			if (sideid === 'p1' || sideid === 'p2') side = this[sideid];
			// This condition should be impossible because the sideid comes
			// from our forked process and if the player id were invalid, we would
			// not have even got to this function.
			if (!side) return; // wtf

			// This condition can occur if the client sends a decision at the
			// wrong time.
			if (!side.currentRequest) return;

			// Make sure the decision is for the right request.
			if ((rqid !== undefined) && (parseInt(rqid) !== this.rqid)) {
				return;
			}

			const targetSide = side.currentRequest === 'teampreview' ? side : side.foe;

			if (targetSide.getDecisionsFinished()) {
				targetSide.undoChoices(true);
			}

			const choices = this.parseChoice(targetSide, input);
			if (!choices) return; // Malformed input

			let choiceOffset = targetSide.choiceData.choices.indexOf('skip');
			if (choiceOffset < 0) choiceOffset = targetSide.choiceData.choices.length;

			for (let i = 0; i < choices.length; i++) {
				const choiceIndex = i + choiceOffset;
				const pokemon = choiceIndex <= targetSide.active.length ? targetSide.active[choiceIndex] : null;
				const choice = choices[i][0];
				let data = choices[i][1];

				if (targetSide.currentRequest === 'switch' && (!pokemon || !pokemon.switchFlag)) {
					// The choice here must be always `pass`, as it was automatically filled by the parser.
					// Note that this pass isn't included in the `pass` counter, as the player
					// has no freedom regarding this action.
					targetSide.choiceData.choices[choiceIndex] = 'pass';
					targetSide.choiceData.decisions[choiceIndex] = {
						choice: 'pass',
						pokemon: pokemon,
						priority: 102,
					};
					continue;
				} else if (targetSide.currentRequest === 'move') {
					// The same comment regarding passing above applies.
					if (!pokemon || pokemon.fainted) {
						targetSide.choiceData.choices[choiceIndex] = 'pass';
						targetSide.choiceData.decisions[choiceIndex] = {
							choice: 'pass',
						};
						continue;
					}
					// Figure out whether we are locked into a move,
					// and override the choice if that's the case.
					const lockedMove = pokemon.getLockedMove();
					if (lockedMove) {
						const lockedMoveTarget = this.runEvent('LockMoveTarget', pokemon);
						targetSide.choiceData.choices[choiceIndex] = 'move ' + lockedMove + (typeof lockedMoveTarget === 'number' ? ' ' + lockedMoveTarget : '');
						targetSide.choiceData.decisions[choiceIndex] = {
							choice: 'move',
							pokemon: pokemon,
							targetLoc: lockedMoveTarget || 0,
							move: lockedMove,
						};
						continue;
					}
				}

				switch (choice) {
				case 'move': {
					let targetLoc = 0;
					if (/\s\-?[1-3]$/.test(data)) {
						targetLoc = parseInt(data.slice(-2));
						data = data.slice(0, data.lastIndexOf(' '));
					}
					let willMega = data.endsWith(' mega');
					let move = willMega ? data.slice(0, -5) : data; // `move` is expected to be either a one-based index or a move id
					if (!targetSide.chooseMove(move.trim(), targetLoc, willMega, true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				}
				case 'switch':
					if (!targetSide.chooseSwitch(data, pokemon.position, true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				case 'shift':
					if (!targetSide.chooseShift()) return targetSide.undoChoices(i, choiceIndex);
					break;
				case 'team':
					if (!targetSide.chooseTeam(data, true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				case 'pass':
					if (!targetSide.choosePass(pokemon.position, true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				case 'default':
					if (!targetSide.chooseDefault(true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				case 'skip':
					if (!targetSide.chooseSkip(pokemon.position, true)) return targetSide.undoChoices(i, choiceIndex);
					break;
				}
			}

			side.updateChoice();
			this.checkDecisions();
		},
		emitCallback: function () {
			const parts = new Array(arguments.length);
			for (let i = 0; i < arguments.length; i++) {
				if (!arguments[i]) {
					parts.push(arguments[i]);
					continue;
				}
				if (arguments[i].pokemon) { // BattleSide
					parts.push(arguments[i].foe);
				} else if (arguments[i].getStatus) { // BattlePokemon
					parts.push(arguments[i].side.foe.active[0]);
				} else {
					parts.push(arguments[i]);
				}
			}
			this.battle.send('sideupdate', this.id + "\n|callback|" + parts.join('|'));
		},
		updateChoice: function () {
			const choiceData = this.currentRequest === 'teampreview' ? this.choiceData : this.foe.choiceData;
			const offset = this.choiceData.choices.length;
			this.battle.send('choice', this.id + "\n" + this.battle.rqid + "\n" + offset + "\n" + JSON.stringify({
				done: choiceData.choices.map((choice, index) => choice === 'skip' ? '' : '' + index).join(""),
				leave: Array.from(choiceData.leaveIndices).join(""),
				enter: Array.from(choiceData.enterIndices).join(""),
				team: this.currentRequest === 'teampreview' ? choiceData.decisions.map(decision => decision.pokemon.position + 1).join("") : null,
			}));
		},
		onBegin: function () {
			const format = this.getFormat();
			this.undoChoice = format.undoChoice;
			this.choose = format.choose;
			this.makeRequest = format.makeRequest;
			this.p1.emitCallback = format.emitCallback;
			this.p2.emitCallback = format.emitCallback;
			this.p1.updateChoice = format.updateChoice;
			this.p2.updateChoice = format.updateChoice;
		},
	},
