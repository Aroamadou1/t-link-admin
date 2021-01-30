import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScriptsUssdPage } from './scripts-ussd.page';

describe('ScriptsUssdPage', () => {
  let component: ScriptsUssdPage;
  let fixture: ComponentFixture<ScriptsUssdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptsUssdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScriptsUssdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
