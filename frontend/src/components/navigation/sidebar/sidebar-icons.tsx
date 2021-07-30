import { useDispatch, useSelector } from 'react-redux';
import environment from '../../../environment';
import { openModal } from '../../../store/ui';
import GuildIcon from '../../guild/guild-icon/guild-icon';
import CreateGuild from '../../modals/create-guild';
import './sidebar-icons.scoped.css';
 
const SidebarIcons: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((s: Store.AppStore) => s.auth.user)!;
  const guilds = useSelector((s: Store.AppStore) => s.entities.guilds)!;

  const iconify = (content: JSX.Element) => 
    <div className="guild-icon flex justify-center mb-1">{content}</div>;

  const guildIcons = guilds.map(g => <GuildIcon key={g.id} guild={g} />);
  const userAvatar = iconify(
    <img
      className="cursor-pointer h-12 w-12 rounded-full"
      src={`${environment.rootAPIURL}${user.avatarURL}`}
      alt={user.username} />
  );

  const openCreateGuild = () => dispatch(openModal({
    typeName: CreateGuild.name,
  }));
  const plusIcon = <div
    onClick={openCreateGuild}
    className="cursor-pointer flex items-center justify-center rounded-full h-12 w-12 bg-bg-primary success text-4xl font-light pb-1">+</div>;

  return (
    <div className="sidebar-icons flex flex-col bg-bg-tertiary px-2">
      {iconify(userAvatar)}
      {iconify(<div className="icon-separator mb-1" />)}
      {guildIcons}
      {plusIcon}
      <CreateGuild />
    </div>
  );
}
 
export default SidebarIcons;