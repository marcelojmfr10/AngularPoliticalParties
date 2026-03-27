import { Component, inject, input } from '@angular/core';
import { ChartFormRow } from '../chart-form-row/chart-form-row';
import { Party } from '../../../types';
import { WebSocketConnectionService } from '../../../web-sockets/services/web-socket-connection.service';

@Component({
  selector: 'chart-form',
  imports: [ChartFormRow],
  templateUrl: './chart-form.html',
  styleUrls: ['./chart-form.css'],
})
export class ChartForm {
  public parties = input.required<Party[]>();
  private webSocketService = inject(WebSocketConnectionService);

  incrementeVotes(party: Party) {
    this.webSocketService.sendMessage({
      type: 'INCREMENT_VOTES',
      payload: { id: party.id },
    });
  }

  decrementeVotes(party: Party) {
    this.webSocketService.sendMessage({
      type: 'DECREMENT_VOTES',
      payload: { id: party.id },
    });
  }

  deleteParty(party: Party) {
    this.webSocketService.sendMessage({
      type: 'DELETE_PARTY',
      payload: { id: party.id },
    });
  }

  updateParty(party: Party) {
    this.webSocketService.sendMessage({
      type: 'UPDATE_PARTY',
      payload: party,
    });
  }

  addParty() {
    this.webSocketService.sendMessage({
      type: 'ADD_PARTY',
      payload: {
        borderColor: this.getRandomHexColor(),
        color: this.getRandomHexColor(),
        name: 'Nuevo partido',
        votes: 0,
      },
    });
  }

  private getRandomHexColor() {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }
}
