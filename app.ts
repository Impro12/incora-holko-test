class User {
    subscriptions:  Subscription[] = [];
  
    subscribe(streamingService : StreamingService) {
      this.subscriptions.push(new Subscription(streamingService));
    }
  }
  
  class Subscription {
    constructor(private streamingService : StreamingService){}
    watch(showName: string){
      if (this.streamingService.viewsByShowNames.has(showName)) {
        let views = this.streamingService.viewsByShowNames.get(showName);
        this.streamingService.viewsByShowNames.set(showName, views + 1)
      } else {
        this.streamingService.viewsByShowNames.set (showName, 1)
      }
    }
  
    getRecommendationTrending(): Show[] {
      return this.streamingService.getMostViewedShowsOfYear(2022);
    }
  
    getRecommendationByGenre(genre: string): Show[] {
      return this.streamingService.getMostViewedShowsOfGenre(genre);
    }
  }
  
  class StreamingService{
    name : string;
    shows : Show[];
    viewsByShowNames = new Map<string, number>();
  
    addShow(show:Show) {
      this.shows.push(show);
    }
  
    getMostViewedShowsOfYear(year: number): Show[] {
      return this.getMostViewed(this.shows.filter(s => s.releaseDate === year));
    }
  
    getMostViewedShowsOfGenre(genre: string) {
      return this.getMostViewed(this.shows.filter(s => s.genre === genre));
    }
  
    private getMostViewed(shows: Show[]) {
      return shows.map(s => new ShowTrend(s, this.viewsByShowNames.get(s.name)))
          .sort((a: ShowTrend, b: ShowTrend) => a.views > b.views ? 1: -1)
          .slice(0, 10)
          .map(item => item.show);
    }
  }
  
  class ShowTrend {
    constructor(
      public show: Show,
      public views: number) {
    }
  }
  
  abstract class Show{
    name: string;
    genre: string;
    releaseDate: number;
    duration: number;
  
    getDuration(){
      return this.duration;
    }
  }
  
  class Movie extends Show{
  
  }
  
  class Episode extends Show{
  
  }
  
  class Series {
    episodes: Episode[];
  }