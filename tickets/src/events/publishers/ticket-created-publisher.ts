import {Publisher, Subjects, TicketCreatedEvent} from '@gakkytickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}