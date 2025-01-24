import dayjs from 'dayjs';
import { Response, Request } from 'miragejs';

import { Entry } from '~/interfaces/entry.interface';
import { Journal } from '~/interfaces/journal.interface';
import { User } from '~/interfaces/user.interface';

import { handleErrors } from '../server';

export function create(schema: any, req: Request): { user: User; journal: Journal } | Response {
  try {
    const { title, userId } = JSON.parse(req.requestBody) as Partial<Journal>;
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      return handleErrors(null, 'No such user exists.');
    }
    const now = dayjs().format();
    const journal = exUser.createJournal({
      title,
      type: 'public',
      createdAt: now,
      updatedAt: now,
    });
    return {
      user: {
        ...exUser.attrs,
      },
      journal: journal.attrs,
    };
  } catch (error) {
    return handleErrors(error, 'Failed to create Journal.');
  }
}

export function addEntry(schema: any, req: Request): { journal: Journal; entry: Entry } | Response {
  try {
    const journal = schema.journals.find(req.params.id);
    const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;
    const now = dayjs().format();
    const entry = journal.createEntry({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });
    journal.update({
      ...journal.attrs,
      updatedAt: now,
    });
    return {
      journal: journal.attrs,
      entry: entry.attrs,
    };
  } catch (error) {
    return handleErrors(error, 'Failed to save entry.');
  }
}

export function getJournals(schema: any, req: Request): Journal[] | Response {
  try {
    const user = schema.users.find(req.params.id);
    return user.journal as Journal[];
  } catch (error) {
    return handleErrors(error, 'Could not get user journals.');
  }
}

export function getEntries(schema: any, req: Request): { entries: Entry[] } | Response {
  try {
    const journal = schema.journals.find(req.params.id);
    return journal.entry;
  } catch (error) {
    return handleErrors(error, 'Failed to get Journal entries.');
  }
}

export function updateJournal(schema: any, req: Request): Journal | Response {
  try {
    const journal = schema.journals.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Journal>;
    const now = dayjs().format();
    journal.update({
      ...data,
      updatedAt: now,
    });
    return journal.attrs as Journal;
  } catch (error) {
    return handleErrors(error, 'Failed to update Journal.');
  }
}

export function updateEntry(schema: any, req: Request): Entry | Response {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Entry>;
    const now = dayjs().format();
    entry.update({
      ...data,
      updatedAt: now,
    });
    return entry.attrs as Entry;
  } catch (error) {
    return handleErrors(error, 'Failed to update entry.');
  }
}
