// Elements
import HeaderBlock from './components/elements/headerBlock/headerBlock';
import LevelTeaser from './components/elements/levelTeaser/levelTeaser';
import StoryLine from './components/elements/storyLine/storyLine';

// Pages
import HomePage from './components/pages/homePage/homePage';
import LevelsPage from './components/pages/levelsPage/levelsPage';
import LevelPage from './components/pages/levelPage/levelPage';

// Levels
import LevelPrologue from './components/levels/levelPrologue/levelPrologue';

import app from './app';

// Elements
app.component('headerBlock', new HeaderBlock());
app.component('levelTeaser', new LevelTeaser());
app.component('storyLine', new StoryLine());

// Pages
app.component('homePage', new HomePage());
app.component('levelsPage', new LevelsPage());
app.component('levelPage', new LevelPage());

// Levels
app.component('levelPrologue', new LevelPrologue());
