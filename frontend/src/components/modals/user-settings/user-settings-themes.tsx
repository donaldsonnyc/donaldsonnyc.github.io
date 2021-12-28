import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, getTheme } from '../../../store/themes';
import { updateSelf } from '../../../store/users';
import SidebarIcon from '../../navigation/sidebar/sidebar-icon';
import CircleButton from '../../utils/buttons/circle-button';

const UserSettingsThemes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const themes = useSelector((s: Store.AppState) => s.entities.themes);
  const user = useSelector((s: Store.AppState) => s.auth.user);
  const themeId = user.activeThemeId;
  const [tab, setTab] = useState(themeId);
  
  useEffect(() => {
    const themeWrapper = document.querySelector('#themeWrapper')!;
    const theme = getTheme(themeId, themes)!;
    
    themeWrapper.innerHTML = (!themeId || themeId === 'default')
    ? `<style></style>`
    : `<style>${theme.styles}</style>`;
  }, [themeId]);
  
  const applyTheme = (id: string) => dispatch(updateSelf({ activeThemeId: id }));

  const SideIcons = () => (
    <div className="flex items-center flex-col">
      {themes.map(t => (
        <div
          key={t.id}
          className="w-12"
          onClick={() => {
            setTab(t.id);
            applyTheme(t.id);
          }}
          title={t.name}>
          <SidebarIcon
            childClasses={classNames('bg-bg-secondary', {
              'border-2 border-primary h-[3.1rem]': t.id === user.activeThemeId,
            })}
            imageURL={t.iconURL}
            name={t.name}
            disableHoverEffect />
        </div>
      ))}
      <CircleButton
        className="m-2"
        onClick={() => dispatch(createTheme('New Theme'))}
        style={{ color: 'var(--success)' }}>+</CircleButton>
    </div>
  );

  const ThemeDetails = () => (tab) ? (
    <div className="">
      
    </div>
  ) : null;

  return (
    <div className="grid grid-cols-12 flex flex-col pt-14 px-10 pb-20 h-full mt-1 gap-8">
      <div className="col-span-1"><SideIcons /></div>
      <div className="col-span-11"><ThemeDetails /></div>
    </div>
  );
}
 
export default UserSettingsThemes;