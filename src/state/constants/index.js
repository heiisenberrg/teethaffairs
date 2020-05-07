import reminderConstants from './reminder.constant';
import doctorConstants from './doctor.constant';
import journalConstants from './journal.constant';
import userConstants from './user.constant';
import paymentConstants from './payment.constant';
import historyConstants from './history.constant';

export const constants = {
   ...reminderConstants,
   ...doctorConstants,
   ...journalConstants,
   ...userConstants,
   ...paymentConstants,
   ...historyConstants
};