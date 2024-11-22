import bcrypt from 'bcrypt'
import { Logger } from 'borgen'
import Admin from '../models/admin.model'
import SiteSettings from '../models/settings.model'
import { dealers } from './seed-data'
import Dealer from '../models/dealer.model'

function seedDatabase() {
  Logger.info({ message: 'Initializing database...' })
  try {
    seedSettings()
    seedAdmin()
    seedDealers()
    return true
  } catch (err) {
    Logger.error({ message: 'Database initialization failed : ' + err })
    return false
  }
}

export default seedDatabase

// Seed admin
async function seedAdmin() {
  Logger.info({ message: 'Initializing admin...' })

  try {
    // Check if admin exists in Db
    let existingAdmin = await Admin.findOne({ role: 'super' }).exec()

    if (!existingAdmin) {
      let hashedPassword = await bcrypt.hash('admin123^', 10)
      // Create admin
      let admin = new Admin({
        name: 'John Doe',
        email: 'admin394@mails.com',
        password: hashedPassword,
        role: 'super',
      })

      await admin.save()

      Logger.info({
        message: 'Admin seeded successfully',
        messageColor: 'greenBright',
        infoColor: 'gray',
      })
    } else {
      Logger.info({
        message: 'Admin already exist in Db',
        messageColor: 'magentaBright',
      })
    }
  } catch (err) {
    Logger.error({ message: 'Error initializing Admin' + err })
  }
}

// Seed the dealers
async function seedDealers() {
  Logger.info({ message: 'Initializing Dealers...' })
  try {
    for (const dealer of dealers) {
      let existingDealers = await Dealer.findOne({
        phone: { $in: dealer.phone },
      }).exec()
      if (!existingDealers) {
        let newDealer = new Dealer({
          dealer_type: dealer.dealer_type,
          phone: dealer.phone,
          address: dealer.address,
          location: dealer.location,
        })

        Logger.info({
          message: 'Dealer seeded successfully',
          messageColor: 'greenBright',
          infoColor: 'gray',
        })

        await newDealer.save()
      } else {
        Logger.info({
          message: 'Dealer already exist in Db',
          messageColor: 'magentaBright',
        })
      }
    }
  } catch (err) {
    Logger.error({ message: 'Error initializing Dealers' + err })
  }
}

// Seeds the site settings
async function seedSettings() {
  Logger.info({ message: 'Initializing settings...' })
  try {
    // Check if settings exist in Db
    let existingSettings = await SiteSettings.find().exec()

    if (existingSettings.length < 1) {
      // Create site settings
      let settings = new SiteSettings({})

      await settings.save()
      Logger.info({
        message: 'Settings initialized successfully',
        messageColor: 'greenBright',
        infoColor: 'gray',
      })
    } else {
      Logger.info({
        message: 'Settings already exist in Db',
        messageColor: 'magentaBright',
      })
    }
  } catch (err) {
    Logger.error({ message: 'Error initializing settings' })
  }
}
