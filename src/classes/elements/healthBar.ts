export default class HealthBar {
  static maxHealth: number = 130;

  healthBar: any;
  healthBarTitle: any;

  constructor(game: any, title: string) {
    let innerBar = game.rectangle(130, 16, "pink"),
        outerBar = game.rectangle(134, 20, "black");

    this.healthBar = game.group(outerBar, innerBar);
    this.healthBar.x = game.canvas.width/2 + 10;
    this.healthBar.y = 36;
    this.healthBar.inner = innerBar;
    this.healthBar.inner.x = 2;
    this.healthBar.inner.y = 2;

    this.healthBarTitle = game.text(title + ':', '20px Futura', 'black', 20, 20);
    this.healthBarTitle.x = game.canvas.width/2 - this.healthBarTitle.width - 5;
    this.healthBarTitle.y = this.healthBar.y - 5;
  }

  setHealth(pv: number): void {
    this.healthBar.inner.width = pv*5;
  };

  getHealth(): number {
    return this.healthBar.inner.width;
  };

  setMaxHealth(): void {
    this.healthBar.inner.width = HealthBar.maxHealth;
  };

  setMinHealth(): void {
    this.healthBar.inner.width = 0;
  };

  setMiddleHealth(): void {
    this.healthBar.inner.width = HealthBar.maxHealth/2;
  };

  alterHealth(pv: number): void {
    let alterPv: number = pv*5;
    if (this.healthBar.inner.width + alterPv < 0) {
      this.healthBar.inner.width = 0;
    } else
    if (HealthBar.maxHealth < this.healthBar.inner.width + alterPv) {
      this.healthBar.inner.width = HealthBar.maxHealth;
    } else {
      this.healthBar.inner.width += alterPv;
    }
  };

  alterHealthPeriodically(pv: number, time: number): void {
    setInterval(() => { this.alterHealth(pv) }, time);
  };

}
