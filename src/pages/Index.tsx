import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface MissingPerson {
  id: number;
  name: string;
  age: number;
  lastSeen: string;
  location: string;
  description: string;
  image: string;
  status: 'активно' | 'найден' | 'закрыто';
  daysGone: number;
}

const missingPeople: MissingPerson[] = [
  {
    id: 1,
    name: 'Алексей Морозов',
    age: 32,
    lastSeen: '15 октября 2024',
    location: 'Москва, район Черёмушки',
    description: 'Рост 180 см, темные волосы, карие глаза. Был одет в черную куртку и джинсы.',
    image: 'https://cdn.poehali.dev/projects/cac48b09-a005-4225-847d-256da5978354/files/cef69147-3cef-4ceb-8b78-3c133cf93ae4.jpg',
    status: 'активно',
    daysGone: 39
  },
  {
    id: 2,
    name: 'Елена Соколова',
    age: 28,
    lastSeen: '3 ноября 2024',
    location: 'Санкт-Петербург, Невский проспект',
    description: 'Рост 165 см, светлые волосы, голубые глаза. Носила красное пальто.',
    image: 'https://cdn.poehali.dev/projects/cac48b09-a005-4225-847d-256da5978354/files/f56d9ce6-08ec-42e2-859f-1e718eba20ec.jpg',
    status: 'активно',
    daysGone: 20
  }
];

export default function Index() {
  const [anonymousForm, setAnonymousForm] = useState({ message: '', contact: '' });
  const [witnessForm, setWitnessForm] = useState({ name: '', phone: '', testimony: '', personId: '' });

  const handleAnonymousSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за информацию. Сообщение отправлено анонимно.');
    setAnonymousForm({ message: '', contact: '' });
  };

  const handleWitnessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Благодарим за содействие. Мы свяжемся с вами в ближайшее время.');
    setWitnessForm({ name: '', phone: '', testimony: '', personId: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.85), rgba(26, 31, 44, 0.85)), url('https://cdn.poehali.dev/projects/cac48b09-a005-4225-847d-256da5978354/files/b6b11f94-3dcc-4af1-ab6b-fd91aefbc369.jpg')`
        }}
      >
        <div className="text-center space-y-6 px-4">
          <div className="flex justify-center mb-4">
            <Icon name="Search" size={64} className="text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            Поиск пропавших
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Каждая информация важна. Помогите найти тех, кто пропал без вести.
          </p>
          <div className="flex gap-8 justify-center text-center pt-4">
            <div>
              <div className="text-4xl font-bold text-primary">{missingPeople.length}</div>
              <div className="text-sm text-muted-foreground">Активных дел</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary">127</div>
              <div className="text-sm text-muted-foreground">Найдено за год</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">89%</div>
              <div className="text-sm text-muted-foreground">Раскрываемость</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Пропавшие люди</h2>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="MessageSquare" size={18} />
                  Анонимное сообщение
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Анонимная информация</DialogTitle>
                  <DialogDescription>
                    Сообщите информацию анонимно. Ваши данные не будут раскрыты.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAnonymousSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="anonymous-message">Сообщение</Label>
                    <Textarea
                      id="anonymous-message"
                      placeholder="Опишите известную вам информацию..."
                      value={anonymousForm.message}
                      onChange={(e) => setAnonymousForm({...anonymousForm, message: e.target.value})}
                      required
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="anonymous-contact">Контакт для связи (необязательно)</Label>
                    <Input
                      id="anonymous-contact"
                      placeholder="Email или телефон (если хотите получить ответ)"
                      value={anonymousForm.contact}
                      onChange={(e) => setAnonymousForm({...anonymousForm, contact: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">Отправить анонимно</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Icon name="Users" size={18} />
                  Я свидетель
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Показания свидетеля</DialogTitle>
                  <DialogDescription>
                    Расскажите, что вы знаете или видели. Ваша информация может помочь.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleWitnessSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="witness-name">Имя</Label>
                    <Input
                      id="witness-name"
                      placeholder="Ваше имя"
                      value={witnessForm.name}
                      onChange={(e) => setWitnessForm({...witnessForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="witness-phone">Телефон</Label>
                    <Input
                      id="witness-phone"
                      placeholder="+7 (___) ___-__-__"
                      value={witnessForm.phone}
                      onChange={(e) => setWitnessForm({...witnessForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="witness-person">Кого вы видели (ID дела)</Label>
                    <Input
                      id="witness-person"
                      placeholder="Например: #1, #2"
                      value={witnessForm.personId}
                      onChange={(e) => setWitnessForm({...witnessForm, personId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="witness-testimony">Показания</Label>
                    <Textarea
                      id="witness-testimony"
                      placeholder="Опишите подробно что, где и когда вы видели..."
                      value={witnessForm.testimony}
                      onChange={(e) => setWitnessForm({...witnessForm, testimony: e.target.value})}
                      required
                      rows={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">Отправить показания</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {missingPeople.map((person) => (
            <Card key={person.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={person.status === 'активно' ? 'destructive' : 'secondary'}>
                    {person.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded">
                  <span className="text-sm text-primary font-semibold">#{person.id}</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-1">{person.name}</CardTitle>
                    <CardDescription className="text-base">
                      {person.age} лет
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary">{person.daysGone}</div>
                    <div className="text-xs text-muted-foreground">дней</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Calendar" size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Последний раз видели</div>
                    <div className="font-medium">{person.lastSeen}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Место</div>
                    <div className="font-medium">{person.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="User" size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Описание</div>
                    <div className="text-sm">{person.description}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Icon name="Phone" size={18} />
                  Сообщить информацию
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur mt-16 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Icon name="AlertCircle" size={48} className="text-primary mx-auto" />
            <h2 className="text-3xl font-bold">Каждая секунда на счету</h2>
            <p className="text-muted-foreground text-lg">
              Если у вас есть любая информация о пропавших людях, пожалуйста, свяжитесь с нами. 
              Анонимность гарантируется. Вместе мы можем спасти жизни.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2">
                <Icon name="Phone" size={20} />
                8-800-555-35-35
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Mail" size={20} />
                help@search.ru
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
