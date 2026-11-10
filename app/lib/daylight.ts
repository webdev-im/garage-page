const LAT = 55.9260665;
const LON = 23.328427;

const PI = Math.PI;
const RAD = PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const OBLIQUITY = RAD * 23.4397;

function toJulian(date: Date) {
  return date.valueOf() / DAY_MS - 0.5 + J1970;
}

function fromJulian(julian: number) {
  return new Date((julian + 0.5 - J1970) * DAY_MS);
}

function toDays(date: Date) {
  return toJulian(date) - J2000;
}

function declination(longitude: number) {
  return Math.asin(Math.sin(longitude) * Math.sin(OBLIQUITY));
}

function solarMeanAnomaly(days: number) {
  return RAD * (357.5291 + 0.98560028 * days);
}

function eclipticLongitude(anomaly: number) {
  const center = RAD * (1.9148 * Math.sin(anomaly) + 0.02 * Math.sin(2 * anomaly) + 0.0003 * Math.sin(3 * anomaly));
  return anomaly + center + RAD * 102.9372 + PI;
}

function hourAngle(altitude: number, latitude: number, dec: number) {
  return Math.acos((Math.sin(altitude) - Math.sin(latitude) * Math.sin(dec)) / (Math.cos(latitude) * Math.cos(dec)));
}

function localNoon(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Vilnius",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const guess = new Date(Date.UTC(value("year"), value("month") - 1, value("day"), 12, 0, 0));
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Vilnius", hour: "2-digit", hourCycle: "h23" }).format(guess)
  );
  return new Date(guess.getTime() - (hour - 12) * 3600000);
}

export function sunTimes(date = new Date(), latitude = LAT, longitude = LON) {
  const lw = RAD * -longitude;
  const phi = RAD * latitude;
  const days = toDays(date);
  const cycle = Math.round(days - 0.0009 - lw / (2 * PI));
  const transit = 0.0009 + lw / (2 * PI) + cycle;
  const anomaly = solarMeanAnomaly(transit);
  const sunLongitude = eclipticLongitude(anomaly);
  const dec = declination(sunLongitude);
  const noon = J2000 + transit + 0.0053 * Math.sin(anomaly) - 0.0069 * Math.sin(2 * sunLongitude);
  const altitude = RAD * -0.833;
  const set = J2000 + 0.0009 + (hourAngle(altitude, phi, dec) + lw) / (2 * PI) + cycle + 0.0053 * Math.sin(anomaly) - 0.0069 * Math.sin(2 * sunLongitude);
  return { sunrise: fromJulian(noon - (set - noon)), sunset: fromJulian(set) };
}

export function isDaytime(date = new Date()) {
  const { sunrise, sunset } = sunTimes(localNoon(date));
  const time = date.getTime();
  return time >= sunrise.getTime() && time < sunset.getTime();
}

export function nextSunChange(date = new Date()) {
  const noon = localNoon(date);
  const { sunrise, sunset } = sunTimes(noon);
  if (date < sunrise) return sunrise;
  if (date < sunset) return sunset;
  return sunTimes(new Date(noon.getTime() + 24 * 60 * 60 * 1000)).sunrise;
}

export const themeBootScript = `(function(){try{
var lat=55.9260665,lon=23.328427,P=Math.PI,R=P/180,D=86400000,J0=2440588,J2=2451545,E=R*23.4397;
function jul(d){return d.valueOf()/D-0.5+J0;}
function unjul(j){return new Date((j+0.5-J0)*D);}
function decl(l){return Math.asin(Math.sin(l)*Math.sin(E));}
function anom(d){return R*(357.5291+0.98560028*d);}
function eclip(m){return m+R*(1.9148*Math.sin(m)+0.02*Math.sin(2*m)+0.0003*Math.sin(3*m))+R*102.9372+P;}
function ha(h,p,dec){return Math.acos((Math.sin(h)-Math.sin(p)*Math.sin(dec))/(Math.cos(p)*Math.cos(dec)));}
function noon(date){
  var parts=new Intl.DateTimeFormat("en-US",{timeZone:"Europe/Vilnius",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date);
  var y,m,d;
  for(var i=0;i<parts.length;i++){if(parts[i].type==="year")y=+parts[i].value;if(parts[i].type==="month")m=+parts[i].value;if(parts[i].type==="day")d=+parts[i].value;}
  var guess=new Date(Date.UTC(y,m-1,d,12,0,0));
  var hour=+new Intl.DateTimeFormat("en-US",{timeZone:"Europe/Vilnius",hour:"2-digit",hourCycle:"h23"}).format(guess);
  return new Date(guess.getTime()-(hour-12)*3600000);
}
function times(date){
  var lw=R*-lon,phi=R*lat,days=jul(date)-J2,n=Math.round(days-0.0009-lw/(2*P));
  var ds=0.0009+lw/(2*P)+n,M=anom(ds),L=eclip(M),dec=decl(L);
  var solarNoon=J2+ds+0.0053*Math.sin(M)-0.0069*Math.sin(2*L);
  var set=J2+0.0009+(ha(R*-0.833,phi,dec)+lw)/(2*P)+n+0.0053*Math.sin(M)-0.0069*Math.sin(2*L);
  return {rise:unjul(solarNoon-(set-solarNoon)),set:unjul(set)};
}
var pref=localStorage.getItem("themePreference");
var dark=pref==="dark";
if(pref!=="light"&&pref!=="dark"){var t=times(noon(new Date()));var now=Date.now();dark=!(now>=t.rise.getTime()&&now<t.set.getTime());}
document.documentElement.classList.toggle("dark",dark);
document.documentElement.dataset.theme=dark?"dark":"light";
}catch(e){}})();`;
