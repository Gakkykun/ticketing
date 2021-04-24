import {Subjects, Publisher, ExpirationCompleteEvent} from '@gakkytickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}