import {Publisher, Subjects, TicketUpdatedEvent} from '@gakkytickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}