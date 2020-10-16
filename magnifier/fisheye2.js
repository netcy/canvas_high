
class Fisheye{
    constructor(radius,distortion){
        this.radius = radius;
        this.distortion = distortion;
        this.rescale();
    }
    radius(r){
        this.radius = r;
        return this.rescale();
    }
    setCenter(c){
        this.center = c;
        return this;
    }
    rescale() {
        var distortion = this.distortion,
            radius = this.radius;
        var k0 = Math.exp(distortion);
        k0 = k0 / (k0 - 1) * radius;
        var k1 = distortion / radius;
        this.k0 = k0;
        this.k1 = k1;
        return this;
    }
    distort(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
        if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};
        var k0 = this.k0,
            k1 = this.k1;
        var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
        return {x: c.x + dx / k, y: c.y + dy / k, z: Math.min(k, 10)};
    }

    distort2(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
        if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};

        var k = Math.log(dd);
         return {x: c.x + dx * k, y: c.y + dy * k, z: Math.min(k, 10)};
    }

    distortion(d){
        this.distortion = d;
        return this.rescale();
    }
    // https://prideout.net/barrel-distortion
    distort3(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
         if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};
        // dd = Math.pow(dd,0.9);
        var theta = Math.atan2(dy,dx);
        dd =  2 * Math.asin(dd / this.radius ) / (Math.PI) * dd ;

        // dd = Math.sin(dd / this.radius * Math.PI/1.5) * dd;

        // radius = asin(radius) / PID2;
        //  sin(PID2*radius)
        // dd = dd * dd / this.radius;
        // dd = Math.sqrt(dd * this.radius * 2)
        // theta += Math.PI/3;

        return {
            x: dd * Math.cos(theta) + c.x,
            y: dd * Math.sin(theta) + c.y
        }

        // var dx =  3 * Math.asin(Math.abs(dx) / this.radius ) / (Math.PI) * dx ;
        // var dy =  3 * Math.asin(Math.abs(dy) / this.radius ) / (Math.PI) * dy ;

        // dx = dx * dx * Math.sign(dx) / this.radius / 2;
        // dy = dy * dy * Math.sign(dx) / this.radius / 2;

        //   return {
        //     x: dx + c.x,
        //     y: dy + c.y
        // }
    }

//     vec2 Distort(vec2 p)
// {
//     float theta  = atan(p.y, p.x);
//     float radius = length(p);
//     radius = pow(radius, BarrelPower);
//     p.x = radius * cos(theta);
//     p.y = radius * sin(theta);
//     return 0.5 * (p + 1.0);
// }
}

// 各种算法介绍
// https://blog.csdn.net/grafx/article/details/57086741
// https://bost.ocks.org/mike/fisheye/#cartesian

// 各种公式啊 
// http://paulbourke.net/miscellaneous/imagewarp/

// #include "stdio.h"
// #include "stdlib.h"
// #include "string.h"
// #include "math.h"
// #include "paulslib.h"
// #include "bitmaplib.h"

// int Eval(double,double,double *,double *);
// void GiveUsage(char *);

// /*
//    Apply various distortions to an image.
//    Written for clarity/simplicity....not efficiency.
//    See the function "Eval()" for a description of the functions
//    Notes
//    - A Wide range of function supported, possibly with parameters
//    - Supports image resolution
//    - Handles arbitrary supersampling antialiasing level
//    - Honour an alpha channel if it exists
// */

// /* Input image */
// BITMAP4 *inimage;
// int nx,ny,depth;

// /* Output image */
// BITMAP4 *outimage;
// int width=500,height=-1;

// /* Command line arguments */
// int antialias = 1;
// int mapping = 0;
// double param1 = 0,param2 = 0,param3 = 0;
// double scale = 1;
// int debug = FALSE;

// int main(int argc,char **argv)
// {
//    int i,j,i2,j2,ai,aj;
//    int found,index;
//    int outofrange = FALSE;
//    FILE *fptr;
//    double x,y;
//    double xnew,ynew;
//    double rsum,gsum,bsum,asum;
//    BITMAP4 background = {100,100,100,0};

//    /* Are there the minimum number of command line arguments */
//    if (argc < 2) 
//       GiveUsage(argv[0]);

//    /* Parse the command line arguments */
//    for (i=1;i<argc;i++) {

//       /*
//          Dimensions of the output image
//          The result will be distorted if these are not in
//          the same proportion to the input image.
//       */
//       if (strcmp(argv[i],"-w") == 0) {
//          i++;
//          width = atoi(argv[i]);
//       }
//       if (strcmp(argv[i],"-h") == 0) {
//          i++;
//          height = atoi(argv[i]);
//       }

//       /*
//          Antialiasing level, supersampling
//          Default is 1 for no antialiasing
//          Typically use 2, 3, 4....squared processing relationship
//       */
//       if (strcmp(argv[i],"-a") == 0) {
//          i++;
//          if ((antialias = atoi(argv[i])) < 1)
//             antialias = 1;
//       }

//       /* 
//          The distortion method
//       */
//       if (strcmp(argv[i],"-m") == 0) {
//          i++;
//          if ((mapping = atoi(argv[i])) < 0)
//             mapping = 0;
//       }

//       /* 
//          Equations can have up to 3 parameters
//          The default value is 0, equations must 
//          be written accordingly
//       */
//       if (strcmp(argv[i],"-p1") == 0) {
//          i++;
//          param1 = atof(argv[i]);
//       }
//       if (strcmp(argv[i],"-p2") == 0) {
//          i++;
//          param2 = atof(argv[i]);
//       }
//       if (strcmp(argv[i],"-p3") == 0) {
//          i++;
//          param3 = atof(argv[i]);
//       }

//       /* 
//          Scale factor, default is 1 for no effect
//          Scale factor than 1 zooms out, less than 1 zooms in
//          Cannot be 0
//       */
//       if (strcmp(argv[i],"-s") == 0) {
//          i++;
//          if ((scale = atof(argv[i])) < 0.0001)
//             scale = 0.0001;
//       }

//       /* Verbose mode */
//       if (strcmp(argv[i],"-v") == 0)
//          debug = TRUE;
//    }

//    /* 
//       If the height isn't specified the output image is square 
//       A default width is used if the output width wasn't specified 
//    */
//    if (height < 0)
//       height = width;

//    if (debug) {
//       fprintf(stderr,"File: %s\n",argv[1]);
//       fprintf(stderr,"   Mapping %d\n",mapping);
//    }

//    /* Malloc output image */
//    if ((outimage = Create_Bitmap(width,height)) == NULL) {
//       fprintf(stderr,"Malloc failed for output image\n");
//       exit(-1);
//    }

//    /* Read the input image */
//    if ((fptr = fopen(argv[1],"rb")) == NULL) {
//       fprintf(stderr,"Failed to open image file \"%s\"\n",argv[1]);
//       exit(-1);
//    }
//    TGA_Info(fptr,&nx,&ny,&depth);
//    if (debug)
//       fprintf(stderr,"   Input image size = %d x %d\n",nx,ny);
//    if ((inimage = Create_Bitmap(nx,ny)) == NULL) {
//       fprintf(stderr,"Malloc failed for image\n");
//       exit(-1);
//    }
//    if (TGA_Read(fptr,inimage,&nx,&ny) != 0) {
//       fprintf(stderr,"Failed to correctly read the image\n");   
//       exit(-1);
//    }
//    fclose(fptr);

//    /* 
//       Form the output image 
//       Find the pixel in the input image for each pixel in the output image
//       Apply supersampling antialiasing, just use box filter
//    */
//    for (j=0;j<height;j++) {
//       for (i=0;i<width;i++) {
//          found = 0;
//          rsum = 0;
//          gsum = 0;
//          bsum = 0;
//          asum = 0;

//          /* Default colour */
//          outimage[j*width+i] = background; 

//          /* Antialias loop */
//          for (ai=0;ai<antialias;ai++) {
//             x = 2 * (i + ai/(double)antialias) / width - 1;
//             x /= scale;

//             for (aj=0;aj<antialias;aj++) {
//                y = 2 * (j + aj/(double)antialias) / height - 1;
//                y /= scale;

//                /* Apply Distortion */
//                if (!Eval(x,y,&xnew,&ynew))
//                   continue;

//                /*    
//                   Determine the point to sample from 
//                   Convert normlaised coordinate to input image coordinates
//                */
//                i2 = 0.5 * nx * (xnew + 1);
//                j2 = 0.5 * ny * (ynew + 1);
//                if (i2 < 0 || i2 >= nx || j2 < 0 || j2 >= ny) {
//                   outofrange = TRUE;
//                   continue;
//                }

//                /* Sum over the antialias group */
//                index = j2 * nx + i2;
//                rsum += inimage[index].r;
//                gsum += inimage[index].g;
//                bsum += inimage[index].b;
//                asum += inimage[index].a;
//                found++;

//             }
//          }

//          /* Finally assign the colour */
//          if (found > 0) {
//             index = j * width + i;
//             outimage[index].r = rsum / (antialias*antialias);
//             outimage[index].g = gsum / (antialias*antialias);
//             outimage[index].b = bsum / (antialias*antialias);
//             outimage[index].a = asum / (antialias*antialias);
//          }

//       }
//    }

//    /* Write the output image to standard out */
//    Write_Bitmap(stdout,outimage,width,height,12);

//    if (outofrange && debug)
//       fprintf(stderr,"   Out of range points were detected\n");

//    exit(0);
// }

// /*
//    Calculate coordinates in input image from points in output image
//    x and y are normalised coordinates, -1 ..1
//    xnew and ynew are also normalised coordinates
// */
// int Eval(double x,double y,double *xnew,double *ynew)
// {
//    double phi,radius,radius2;
//    double xtmp,ytmp;
//    double denom;

//    /* Some things that may be needed */
//    radius2 = x*x + y*y;
//    radius = sqrt(radius2);
//    phi = atan2(y,x);

//    switch (mapping) {
//    case 1:
//       /*
//          Square root radial function
//          Normally clamped to radius <= 1
//       */
//       radius = sqrt(radius);
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 2:
//       /*
//          arcsin radial function
//       */
//       if (radius > 1) 
//          return(FALSE);
//       radius = asin(radius) / PID2;
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 3:
//       /*
//          sin radial function
//          Normally clamped to radius <= 1
//       if (radius > 1)
//          return(FALSE);
//       */
//       radius = sin(PID2*radius);
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 4:
//       /*
//          radius to a power, radial function
//          Normally clamped to radius <= 1 
//       if (radius > 1)
//          return(FALSE);
//       */
//       radius = pow(radius,param1);
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 5:
//       /*
//          sin function cartesian function
//       */
//       *xnew = sin(PID2*x);
//       *ynew = sin(PID2*y);
//       break;
//    case 6:
//       /*
//          square cartesian function
//          Includes quadrant preserving
//       */
//       *xnew = x * x * SIGN(x);
//       *ynew = y * y * SIGN(y);
//       break;
//    case 7:
//       /*
//          arc sine cartesian function
//       */
//       *xnew = asin(x) / PID2;
//       *ynew = asin(y) / PID2;
//       break;
//    case 8:
//       /*
//          (1-ar^2) cartesian function
//       */
//       *xnew = x * (1 - param1 * radius2) / (1 - param1);
//       *ynew = y * (1 - param1 * radius2) / (1 - param1);
//       break;
//    case 9:
//       /* 
//          Method by H. Farid and A.C. Popescu 
//          Used for modest lens with good fit
//       */
//       denom = 1 - param1 * radius2;
//       xtmp = x / denom;
//       ytmp = y / denom;
//       if (xtmp <= -1 || xtmp >= 1 || ytmp <= -1 || ytmp >= 1)
//          return(FALSE);
//       denom = 1 - param1 * (xtmp*xtmp+ytmp*ytmp);
//       if (ABS(denom) < 0.000001)
//          return(FALSE);
//       *xnew = x / denom;
//       *ynew = y / denom;
//       break;
//    case 10:
//       /* 
//          Logarithmic relationship
//          eg: fitted to test pattern with 2 parameters
//       */
//       radius = param1 * pow(10.0,param2*radius) - param1;
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 11:
//       /* 
//          General third order polynomial
//          eg: fitted to test pattern with 3 parameters
//       */
//       radius = param1 * radius2*radius + param2 * radius2 + param3 * radius;
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 12:
//       /*
//          Janez Pers, Stanislav Kovacic
//          Alternative Model o Radial Distortion in Wide-Angle Lenses
//          Single parameter model
//       */
//       radius = -0.5*param1*(exp(-2*radius/param1)-1) / (exp(-radius/param1));
//       *xnew = radius * cos(phi);
//       *ynew = radius * sin(phi);
//       break;
//    case 13:
//       /* 
//          Image rotate by parameter1 in radians
//       */
//       *xnew = radius * cos(phi+param1);
//       *ynew = radius * sin(phi+param1);
//       break;
//    case 0:
//    default:
//       /*
//          Unity mapping
//       */
//       *xnew = x;
//       *ynew = y;
//       break;
//    }

//    return(TRUE);
// }

// void GiveUsage(char *s)
// {
//    fprintf(stderr,"%s tgafilename [options]\n",s);
//    fprintf(stderr,"Options:\n");
//    fprintf(stderr,"-a n   set antialias level (Default: %d)\n",antialias);
//    fprintf(stderr,"-w n   width of the output image (Default: %d)\n",width);
//    fprintf(stderr,"-h n   height of the output image (Default: width)\n");
//    fprintf(stderr,"-m n   mapping type (Default: %d)\n",mapping);
//    fprintf(stderr,"-p1 n  first parameter for mapping (Default: 0)\n");
//    fprintf(stderr,"-p2 n  second parameter for mapping (Default: 0)\n");
//    fprintf(stderr,"-p3 n  third parameter for mapping (Default: 0)\n");
//    fprintf(stderr,"-s n   scale factor (Default: 1)\n");
//    fprintf(stderr,"-v     debug/verbose mode (Default: off)\n");
//    exit(-1);
// }


