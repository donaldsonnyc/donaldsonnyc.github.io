import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from './ws-event';
import { Channel } from '../../data/models/channel';
import striptags from 'striptags';
import { WS } from '@acrd/types';
import ProfanityFilter from 'bad-words';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  on = 'MESSAGE_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { attachmentURLs, channelId, content, embed }: WS.Params.MessageCreate) {
    const authorId = ws.sessions.userId(client);

    const [_, channel, author] = await Promise.all([
      deps.wsGuard.validateCanInChannel(client, channelId, 'SEND_MESSAGES'),
      deps.channels.getText(channelId),
      deps.users.getSelf(authorId),
    ]);

    var message = await deps.messages.create(authorId, channelId, {
      attachmentURLs,
      content: this.filterContent(content, channel.filterProfanity),
      embed,
    });

    channel.lastMessageId = message.id;
    await channel.save();

    author.lastReadMessageIds ??= {};
    author.lastReadMessageIds[channelId] = message.id;
    await author.save();

    return [{
      emit: this.on,
      to: [channelId],
      send: { message },
    }];
  }

  private filterContent(content: string | undefined, filterProfanity: boolean) {
    const badWords = new ProfanityFilter({ placeHolder: '?' });
    if (content && filterProfanity)
      return striptags(badWords.clean(content));
    else if (content)
      return striptags(content);
    return '';
  }
}