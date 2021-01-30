import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScriptsPage } from './scripts.page';

describe('ScriptsPage', () => {
  let component: ScriptsPage;
  let fixture: ComponentFixture<ScriptsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScriptsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
