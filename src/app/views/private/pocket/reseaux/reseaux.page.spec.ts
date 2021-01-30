import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReseauxPage } from './reseaux.page';

describe('ReseauxPage', () => {
  let component: ReseauxPage;
  let fixture: ComponentFixture<ReseauxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReseauxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReseauxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
