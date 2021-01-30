import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipementsPage } from './equipements.page';

describe('EquipementsPage', () => {
  let component: EquipementsPage;
  let fixture: ComponentFixture<EquipementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
