import { ChildProcessWithoutNullStreams } from 'child_process'
import { TransformOptions } from '@babel/core'
export namespace iePasser {
	declare interface Conf {
		opts?: TransformOptions
		out?: string
		version?: '5' | '7' | '8' | '9' | '10' | '11' | 'edge'
	}
	export let defConf: Conf
}
export function iePasser(
	path: string | string[],
	test: { [testName: number | string]: () => void } | (() => void),
	conf?: iePasser.Conf,
): Promise<ChildProcessWithoutNullStreams>
export default iePasser