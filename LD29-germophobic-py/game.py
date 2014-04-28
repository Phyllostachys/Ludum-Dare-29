# Ludum Dare 29
# Team Confused Dog:
# - Jacob Shaffer - programming
# - Ed Keener - design
# - Alex Huston - art

import pygame
import random
from pygame.locals import *

# Game parameters
screenWidth, screenHeight = 800, 700
germWidth = germHeight = 15;
germJiggle = 2;
germSpeed = 1;
germs = {};
backgroundColor = 0, 0, 0
germFilenames = ['flu.png', 'common-cold.png']
numberOfGermTypes = 2
killRadius = 5
points = 0

pygame.init()
screen = pygame.display.set_mode((screenWidth, screenHeight), 0, 32)
clock = pygame.time.Clock()

backgroundImage = pygame.image.load("background.png")
backgroundImage.convert()
screen.blit(backgroundImage, (0,0))

fluSurface = pygame.image.load("flu.png")
coldSurface = pygame.image.load("flu.png")

# font object
dispFont = pygame.font.SysFont("monospace", 11)

# germ generator
pygame.time.set_timer(USEREVENT+1, 5000)

class Germ:
    def __init__(self, xPos, yPos, xDir, yDir, screen, surface):
        self.xPos = xPos
        self.yPos = yPos
        self.xDir = xDir
        self.yDir = yDir
        self.screen = screen
        self.surface = surface
    def move(self, dx, dy):
        self.xPos += dx + self.xDir
        self.yPos += dy + self.yDir
    def update(self):
        self.screen.blit(self.surface,(self.xPos, self.yPos))

def getOrganDirection(num):
    if 1 == num:
        return {'x': -germSpeed, 'y': germSpeed - 0.1}
    elif 2 == num:
        return {'x': -germSpeed, 'y': 0};
    elif 3 == num:
        return {'x': -germSpeed, 'y': -germSpeed + .5};
    elif 4 == num:
        return {'x': -0.25, 'y': -germSpeed};
    elif 5 == num:
        return {'x': germSpeed, 'y': -germSpeed};
    elif 6 == num:
        return {'x': germSpeed, 'y': 0};
    elif 7 == num:
        return {'x': germSpeed, 'y': germSpeed - 0.4};
    else:
        return {'x': 0, 'y': 0};

def generateGerms(number, difficulty):
    direction = getOrganDirection(random.randint(1, 7))
    for i in range(0,number):
        g = pygame.Surface(fluSurface.get_size(), 0, fluSurface)
        g.convert()
        germs[len(germs)] = Germ(400, 350, direction['x'], direction['y'], screen, g)

generateGerms(15,1)
# The main game loop
#
while True:
    # Limit frame speed to 50 FPS
    #
    time_passed = clock.tick(60)

    germsToKill = []
    for event in pygame.event.get():
        if event.type == USEREVENT+1:
            generateGerms(15,1)
        if event.type == pygame.MOUSEBUTTONDOWN:
            pos = pygame.mouse.get_pos()
            for germ in germs:
                if germs[germ].xPos - killRadius <= pos[0] and germs[germ].xPos + germWidth + killRadius >= pos[0] and germs[germ].yPos - killRadius <= pos[1] and germs[germ].yPos + germHeight + killRadius >= pos[1]:
                    germsToKill.append(germ)
            points += len(germsToKill)
        if event.type == pygame.QUIT:
            exit_game()

    # clear the screen
    screen.fill(backgroundColor)

    # redraw background image
    screen.blit(backgroundImage, (0,0))

    # Update and redraw all germs
    for germ in germs:
        germs[germ].move(random.randint(-germJiggle, germJiggle), random.randint(-germJiggle, germJiggle))
        if germs[germ].xPos < 0 or germs[germ].xPos > screenWidth or germs[germ].yPos < 0 or germs[germ].yPos > screenHeight:
            germsToKill.append(germ)
        else:
            germs[germ].update()

    # display points
    screen.blit(dispFont.render("Points: " + repr(points), 1, (0,0,0)), (screenWidth - 150, 20))

    # remove dead germs
    for deadGerm in germsToKill:
        del germs[deadGerm]

    pygame.display.flip()

