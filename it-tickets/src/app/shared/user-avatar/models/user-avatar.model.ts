export class UserAvatarModel {
  readonly backupIcon = '/profile_icon.png';
  initials: string = '';
  bgGradient = '';
  hasInitials: boolean = false;
  name?: string;
  surname?: string;
  email?: string;

  constructor(data?: Partial<UserAvatarModel>) {
    Object.assign(this, data)
  }

  findInitials = (): void => {
    const n = (this.name || '').trim();
    const s = (this.surname || '').trim();

    if (n && s) {
      this.hasInitials = true;
      this.initials = (n[0] + s[0]).toUpperCase();
      return;
    } else if (!n) {
      this.hasInitials = true;
      this.initials = s[0].toUpperCase() + s[1];
      return;
    } else if (!s) {
      this.hasInitials = true;
      this.initials = n[0].toUpperCase() + n[1];
      return;
    } else {
      this.hasInitials = false;
      this.initials = '?';
    }
  }

  computeGradient(): string {
    const center = '#D1DDEF';
    const mid = '#86A6D5';
    const edge = '#3E6BB4';

    this.bgGradient = `radial-gradient(circle at center, ${center} 50%, ${mid} 75%, ${edge} 100%)`;
    return this.bgGradient;
  }
}